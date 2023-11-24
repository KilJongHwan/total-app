import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { formatDate } from "../../utils/Common";
import { storage } from "../../api/firebase";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";

const Container = styled.div`
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 320px;
  margin: 20px auto;
  background: rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserName = styled.h2`
  margin-left: 20px;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Label = styled.label`
  display: block;
  margin: 20px 30px;
  font-weight: bold;
`;
const SubmitButton = styled.button`
  padding: 8px;
  background-color: #4caf50;
  width: 60px;
  margin-left: 4px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #2c7d32;
  }
`;

const MemberInfo = () => {
  const { email } = useParams();
  const [member, setMember] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const context = useContext(UserContext);
  const { setName } = context;

  useEffect(() => {
    const memberInfo = async () => {
      const rsp = await AxiosApi.memberGetOne(email);
      if (rsp.status === 200) {
        setMember(rsp.data);
        setUrl(rsp.data.image);
      }
    };
    memberInfo();

    // 로컬스토리지에서 로그인한 사용자 정보를 가져옵니다.
    const loginUserEmail = localStorage.getItem("email");
    // 로그인한 사용자와 글쓴이가 같은지 비교합니다.
    if (loginUserEmail === email) {
      setIsCurrentUser(true);
    }
  }, [email]);

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
    } else {
      setEditName(e.target.value);
    }
  };

  // 회원 정보 업데이트 Axios 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rsp = await AxiosApi.memberUpdate(email, editName, url);
    if (rsp.status === 200) {
      setEditMode(false);
      setName(editName);
      const rsp = await AxiosApi.memberGetOne(email);
      if (rsp.status === 200) {
        setMember(rsp.data);
        setUrl(rsp.data.image);
      }
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);

      // 업로드 후 이미지 URL 가져오기
      const uploadedUrl = await fileRef.getDownloadURL();
      setUrl(uploadedUrl); // 미리보기 URL 업데이트
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <Container>
      <UserInfo>
        <UserImage src={url || "http://via.placeholder.com/160"} alt="User" />
        {!editMode ? (
          <UserName>{member.name}</UserName>
        ) : (
          <Input
            type="text"
            name="name"
            placeholder="이름을 입력하세요."
            value={editName}
            onChange={handleChange}
          />
        )}
      </UserInfo>
      {!editMode ? (
        <>
          <Field>
            <Label>Email : {member.email}</Label>
          </Field>
          <Field>
            <Label>가입일 : {formatDate(member.regDate)}</Label>
          </Field>
          {/* 현재 사용자가 로그인한 사용자인 경우에만 편집 버튼 표시 */}
          {isCurrentUser && (
            <SubmitButton onClick={() => setEditMode(true)}>편집</SubmitButton>
          )}
        </>
      ) : (
        <>
          <Field>
            <Label>이미지 업로드</Label>
            <input type="file" name="file" onChange={handleChange} />
            <SubmitButton onClick={handleUploadClick}>업로드</SubmitButton>
          </Field>
          {/* 필요한 다른 입력 필드 */}
          <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
          <SubmitButton onClick={() => setEditMode(false)}>취소</SubmitButton>
        </>
      )}
    </Container>
  );
};

export default MemberInfo;
