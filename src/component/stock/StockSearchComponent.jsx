import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import debounce from "lodash.debounce";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  border: 2px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 10px;
  &:focus {
    outline: none;
    border-color: #aaa;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #4584f3;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #3367d6;
  }
`;

const Results = styled.div`
  width: 300px;
  margin-top: 20px;
  background: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const StockSearchComponent = () => {
  const [companyName, setCompanyName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stockData, setStockData] = useState(null);

  // 검색 결과를 가져오는 함수를 디바운스 처리합니다.
  const debouncedSearch = debounce(async (query) => {
    if (!query.trim()) return;
    try {
      const response = await AxiosApi.stockSearchByName(query);
      setStockData(response.data);
      // 연관 검색어를 가져오는 API가 있다고 가정하고 함수를 호출합니다.
      // setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error searching stock by name:", error);
      setStockData(null);
    }
  }, 300);

  useEffect(() => {
    // 사용자가 입력할 때마다 검색합니다.
    debouncedSearch(companyName);
    // 컴포넌트 언마운트 시 디바운스 함수를 취소합니다.
    return () => debouncedSearch.cancel();
  }, [companyName]);

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
        />
        <Button onClick={() => debouncedSearch(companyName)}>Search</Button>
      </InputContainer>
      <Results>
        {suggestions.length > 0 && (
          <div>
            {suggestions.map((suggestion, index) => (
              <ResultItem key={index}>{suggestion}</ResultItem>
            ))}
          </div>
        )}
        {stockData && (
          <div>
            <h3>Stock Data</h3>
            {stockData && (
              <div>
                {stockData.hits.hits.map((hit, index) => (
                  <div key={index}>
                    <p>회사명: {hit._source["회사명"]}</p>
                    <p>종목코드: {hit._source["종목코드"]}</p>
                    <p>현재가: {hit._source["현재가"]}</p>
                    {/* 나머지 필드도 이와 같은 방식으로 출력할 수 있음 */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Results>
    </Container>
  );
};

export default StockSearchComponent;
