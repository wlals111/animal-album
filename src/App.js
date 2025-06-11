// ui 그려주는 역할
import TabBar from './components/TabBar.js';
import Content from './components/Content.js';
import { request } from './components/api.js';

// 전달 받은 <div id="app">의 자식요소에 ui가 들어감
export default function App($app) {
  // 상태관리
  this.state = {
    // 현재 어떤 탭이 눌렸는지 저장
    // 현재 경로를 상태로 관리함. /만 있으면 all을 기본값으로 함
    currentTab: window.location.pathname.replace('/', '') || 'all',
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
      // 페이지 url을 /${name}으로 바꿈
      history.pushState(null, `${name} 사진`, name);

      console.log(window.location.pathname);

      // 해당 탭의 데이터만 다시 업데이트
      this.updateContent(name);
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

  // 브라우저 히스토리의 상태가 변경될 때마다 실행
  window.addEventListener('popstate', async () => {
    // 히스토리가 변경되는 것에 맞게 데이터를 다시 불러와서 화면 업데이트
    this.updateContent(window.location.pathname.replace('/', ''));
  });

  // 중복되는 코드 함수
  this.updateContent = async (tabName) => {
    try {
      const currentTab = tabName === 'all' ? '' : tabName;
      // 사진 데이터의 초기값으로 api호출 결과값 넣어줌
      const Photos = await request(currentTab);

      // 사진데이터와 탭 바 업데이트
      this.setState({
        ...this.state,
        photos: Photos,
        currentTab: tabName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 웹페이지의 초기 상태값 설정
  const init = async () => {
    this.updateContent(this.state.currentTab);
  };
  init();
}
