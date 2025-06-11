// ui 그려주는 역할
import TabBar from './components/TabBar.js';
import Content from './components/Content.js';
import { request } from './components/api.js';

// 전달 받은 <div id="app">의 자식요소에 ui가 들어감
export default function App($app) {
  // 상태관리
  this.state = {
    // 현재 어떤 탭이 눌렸는지 저장
    currentTab: 'all',
    // api로 호출된 사진들의 데이터를 담을 배열
    photos: [],
  };

  // TabBar에 넘기는 props($app, initialStatem onClick)
  const tabBar = new TabBar({
    $app,
    // initialState : TabBar컴퍼넌트의 초기 상태
    initialState: '',
    // onClick : 탭바를 클릭했을 때 실행할 함수(상태 갱신 + api요청)
    // name : 클릭된 tab의 이름
    onClick: async (name) => {
      this.setState({
        ...this.state,
        // 현재 눌린탭으로 이름을 바꿈
        currentTab: name,

        // api는 비동기로 처리해야 하므로 async/await으로 처리
        // api를 요청해서 응답결과를 상태로 저장
        // name이 all이면 빈 문자열을 전달, all이 아니면 기존의 name 전달
        photos: await request(name === 'all' ? '' : name),
      });
    },
  });

  // Content에 넘기는 props($app, initialState)
  const content = new Content({
    $app,
    // content컴퍼넌트의 초기상태
    initialState: [],
  });

  // 상태들을 업데이트
  this.setState = (newState) => {
    // 현재 상태를 새로운 값으로 업데이트
    this.state = newState;

    // 업데이트한 상태들을 tabBar와 content에 전달
    tabBar.setState(this.state.currentTab);
    content.setState(this.state.photos);
  };

  // 웹페이지의 초기 상태값 설정
  const init = async () => {
    try {
      // 사진 데이터의 초기값으로 api호출 결과값 넣어줌
      const initialPhotos = await request();
      this.setState({
        ...this.state,
        photos: initialPhotos,
      });
    } catch (error) {
      console.log(error);
    }
  };
  init();
}
