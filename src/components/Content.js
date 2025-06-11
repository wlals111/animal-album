export default function Content({ $app, initialState }) {
  // 초기 사진 상태 []
  this.state = initialState;
  this.$target = document.createElement('div');
  this.$target.className = 'content';
  $app.appendChild(this.$target);

  this.template = () => {
    let temp = [];
    if (this.state) {
      this.state.forEach((item) => {
        temp += `<img src=${item.url}/>`;
      });
    }
    return temp;
  };

  // ui렌더링 함수
  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  // 상태 변화 함수
  this.setState = (newState) => {
    this.state = newState;

    // 상태 업데이트 후 렌더링
    this.render();
  };

  this.render();
}
