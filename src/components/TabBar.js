// 탭 ui렌더링, 클릭 이벤트를 처리하는 컴퍼넌트
export default function TabBar({ $app, initialState, onClick }) {
  // 처음에 선택된 탭바 ''
  this.state = initialState;
  this.onClick = onClick;

  // temp 요소들을 감싸는 div태그 생성 -> .app의 자식 요소로 추가
  this.$target = document.createElement('div');
  this.$target.className = 'tab-bar';
  $app.appendChild(this.$target);
  // console.log(this);

  // 4개의 탭바 요소를 반환하는 함수
  this.template = () => {
    let temp = `
    <div id="all">전체</div>
    <div id="penguin">펭귄</div>
    <div id="koala">코알라</div>
    <div id="panda">판다</div>`;

    return temp;
  };

  // ui렌더링 함수
  this.render = () => {
    // console.log(this.template());
    // .tab-bar div요소의 자식으로 template()의 반환값을 추가
    this.$target.innerHTML = this.template();

    let $currentTab = document.getElementById(this.state);
    $currentTab ? ($currentTab.className = 'clicked') : '';

    // 클래스가 tab-bar인 div 내부의 모든 div요소들을 가져옴
    let $tabBar = this.$target.querySelectorAll('div');
    console.log($tabBar);
    $tabBar.forEach((item) => {
      // 요소들을 클릭했을 때 onClick함수가 실행됨
      // 각각의 탭 바에 클릭 이벤트를 불여줌
      item.addEventListener('click', () => {
        onClick(item.id);
      });
    });
  };

  this.setState = (newState) => {
    this.state = newState;
    // 상태 업데이트 후 렌더링
    this.render();
  };
}
