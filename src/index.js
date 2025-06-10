import App from './App.js';

const $app = document.querySelector('#app');

// App컴퍼넌트의 새로운 인스턴스(객체) 생성
// id가 app인 dom요소를 생성자함수에 전달해서
// App컴퍼넌트의 인스턴스가 app요소안에 ui를 표시할 수 있도록 함
new App($app);
