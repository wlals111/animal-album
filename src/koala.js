const API_URL = 'https://animal-api-two.vercel.app/';

const $content = document.querySelector('.content');

const getData = async (name) => {
  // api 호출 : fetch는 비동기 함수이므로 async와 await으로 처리
  // API_URL과 name을 붙인 주소로 api를 요청함 -> name이 koala인 사진만 불러옴
  let response = await fetch(`${API_URL}${name}`);

  let template = '';
  try {
    // api응답이 있으면 json데이터로 파싱 (비동기 작업이 때문에 await필요)
    if (response) {
      let data = await response.json();
      // console.log(data);

      // 응답받은 data객체에서 photos 배열을 순회
      data.photos.forEach((item) => {
        console.log(item);
        // template에 각각의 url이 담긴 img태그를 누적하여 저장
        template += `<img src=${item.url}/>`;
      });

      // 모든 img태그를 .content요소의 자식 요소로 추가
      $content.innerHTML = template;
    }
  } catch (error) {
    // 에러 발생 시 콘솔에 출력
    console.log(error);
  }
};
getData('koala');
