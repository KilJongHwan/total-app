import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";

const AxiosApi = {
  // 로그인
  memberLogin: async (email, pw) => {
    console.log("로그인 : ", email, pw);
    const login = {
      email: email,
      pwd: pw,
    };
    return await axios.post(KH_DOMAIN + "/users/login", login);
  },
  //회원 전체 조회
  memberGet: async () => {
    return await axios.get(KH_DOMAIN + `/users/list`);
  },
  // 회원 조회
  memberGetOne: async (email) => {
    return await axios.get(KH_DOMAIN + `/users/detail/${email}`);
  },

  // 회원 가입
  memberReg: async (email, pwd, name) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name,
    };
    return await axios.post(KH_DOMAIN + "/users/new", member);
  },
  // 회원 가입 여부 확인
  memberRegCheck: async (email) => {
    console.log("가입 가능 여부 확인 : ", email);
    return await axios.get(KH_DOMAIN + `/users/check?email=${email}`);
  },
  // 회원 정보 수정
  memberUpdate: async (email, name, image) => {
    console.log("회원 정보 수정 : ", email, name, image);
    const member = {
      email: email,
      name: name,
      image: image,
    };
    return await axios.put(KH_DOMAIN + `/users/modify`, member);
  },

  // 회원 탈퇴
  memberDel: async (id) => {
    const del = {
      id: id,
    };
    return await axios.post(KH_DOMAIN + "/user/delete", del);
  },
  // 게시글 조회
  boardList: async () => {
    return await axios.get(KH_DOMAIN + "/api/board/list");
  },
  // 게시글 상세 조회
  boardDetail: async (boardId) => {
    return await axios.get(KH_DOMAIN + `/api/board/detail/${boardId}`);
  },
  // 게시글 쓰기
  boardWrite: async (email, title, categoryId, content, img) => {
    const board = {
      email: email,
      title: title,
      categoryId: categoryId,
      content: content,
      img: img,
    };
    return await axios.post(KH_DOMAIN + "/api/board/new", board);
  },
  // 게시글에 달린 댓글 조회
  commentList: async (boardId) => {
    return await axios.get(KH_DOMAIN + `/api/comment/list/${boardId}`);
  },
  // 댓글 쓰기
  commentWrite: async (email, boardId, content) => {
    console.log("댓글 쓰기 : ", email, boardId, content);
    const comment = {
      boardId: boardId,
      email: email,
      content: content,
    };
    return await axios.post(KH_DOMAIN + `/api/comment/new`, comment);
  },
  // 카테고리 조회
  cateList: async () => {
    return await axios.get(KH_DOMAIN + `/api/category/list`);
  },
  // 카테고리 쓰기
  cateInsert: async (email, category) => {
    const cate = {
      email: email,
      categoryName: category,
    };
    return await axios.post(KH_DOMAIN + "/api/category/new", cate);
  },
  // 카테고리 삭제
  cateDelete: async (categoryId) => {
    return await axios.delete(KH_DOMAIN + `/api/category/delete/${categoryId}`);
  },
  // 카테고리 수정
  cateUpdate: async (todoId) => {
    return await axios.put(KH_DOMAIN + `/api/todo/${todoId}`);
  },
  // 영화 목록 조회
  movieList: async () => {
    return await axios.get(KH_DOMAIN + "/api/movies/list");
  },
  // 영화 페이지 수 조회
  moviePage: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/api/movies/list/count?page=${page}&size=${size}`
    );
  },
  // 영화 페이지네이션 조회
  moviePageList: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/api/movies/list/page?page=${page}&size=${size}`
    );
  },
  // 채팅방 목록 보기
  chatList: async () => {
    return await axios.get(KH_DOMAIN + "/chat/list");
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await axios.get(KH_DOMAIN + `/chat/room/${roomId}`);
  },
  // 채팅방 생성
  chatCreate: async (email, name) => {
    const chat = {
      email: email,
      name: name,
    };
    return await axios.post(KH_DOMAIN + "/chat/new", chat);
  },
  // 이전 채팅 가져오기
  recentChatLoad: async (roomId) => {
    return await axios.get(KH_DOMAIN + `/chat/message/${roomId}`);
  },
};
export default AxiosApi;
