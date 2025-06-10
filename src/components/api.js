// api호출하고 결과값 반환
const API_URL = 'https://animal-api-two.vercel.app/';

export const request = async () => {
  // api 호출 : fetch는 비동기 함수이므로 async와 await으로 처리
  let response = await fetch(API_URL);
  try {
    // api응답이 있으면 json데이터로 파싱 (비동기 작업이 때문에 await필요)
    if (response) {
      let data = await response.json();
      console.log(data);

      // 데이터 배열 반환
      return data.photos;
    }
  } catch (error) {
    // 에러 발생 시 콘솔에 출력
    console.log(error);
  }
};
