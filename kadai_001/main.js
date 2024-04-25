// 変数の初期化
let untyped ='';
let typed = '';
let score = 0;


// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');


// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];


// ランダムなテキストを表示
const createText = () =>{
  //typedに「''」を代入する
  typed = '';
  //「typedfield = document.getElementById('typed');」のテキストを更新する(typedにする）
  typedfield.textContent = typed;
  //「乱数値*「textLists.length」（配列の要素数）」の値をMath.floor()メソッドで整数値にする
  let random = Math.floor(Math.random() * textLists.length);
  //配列textListsの要素番号に上記で求めた数値が入り、untypedに代入する
  untyped = textLists[random];
  //「untypedfield = document.getElementById('untyped');」のテキストを更新する（untypedにする）
  untypedfield.textContent = untyped;
};


const keyPress = e => {
  //キークリックした文字列と「untyped = textLists[random];」のsubstring(0,1)で求めた文字列が不一致の場合、
  if(e.key !== untyped.substring(0, 1)){
    //「wrap = document.getElementById('wrap')」に「class='mistyped'」を追加する
    wrap.classList.add('mistyped');
    //setTimeout()メソッドを実行(一定時間後に一度だけ処理を行う)※間違えた時は赤背景になるが、そのクラスは　100ミリ秒のみ実行する
    setTimeout(() => {
      //「wrap = document.getElementById('wrap')」の「class='mistyped'」を削除する
      wrap.classList.remove('mistyped');
    },100);
    //trueの場合、この操作を抜ける///////////////////////////////////////////////if文にreturn?
    return;
  }
  //「wrap = document.getElementById('wrap')」の「class='mistyped'」を削除する
  wrap.classList.remove('mistyped');
  //scoreを１増やす
  score++;
  //「typed = ''」＋「untyped = textLists[random];」のsubstring(0,1)をtypedに代入する
  typed += untyped.substring(0, 1);
  //「untyped = textLists[random];」のsubstring(1)をuntypedに代入する
  untyped = untyped.substring(1);
  //「typedfield = document.getElementById('typed')」のテキストを更新する（typedにする）
  typedfield.textContent = typed;
  //「untypedfield = document.getElementById('untyped')」のテキストを更新する（untypedにする）
  untypedfield.textContent = untyped;
  //『untyped = textLists[random];」のsubstring(1)をuntypedに代入していっている』が「''」と一致している場合、

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //kadai追加
  cntType.textContent =score;
  document.body.appendChild(cntType);
  ////////////////////////////////n/////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  if(untyped === ''){
    //createText()メソッドを実行する
    createText();
  }
};


//引数scoreはkeyPress()で数値の可変がある
const rankCheck = score => {
  let text = '';
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  }else if(score < 200){
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  }else if(score < 300){
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  }else if(score >= 300){
    text = `あなたのランクはSです。\nおめでとうございます`;
  }
  //テンプレートリテラル（バッククォートで文字列を囲むこと）。${変数名}は変数の埋め込み。
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};


const gameOver = id => {
  //clearInterval()メソッドを実行し、引数idをタイマー停止する
  clearInterval(id);
  //confirm()メソッド※キャンセル・OKの確認ダイアログメッセージ。引数はメッセージ
  const result = confirm(rankCheck(score));
  //上記でOK（真）の場合、
  if(result == true){
    //ページを再読み込みする
   window.location.reload();
  }
};


const timer = () => {
  //「count = document.getElementById('count')」をのテキストを取得し、timeに代入する
  let time = count.textContent;
  //setInterval()メソッドを実行。1000ミリ秒毎に実行する。
  const id = setInterval(() => {
    //「time = count.textContent」を１減らす
    time--;
    //「count = document.getElementById('count')」のテキストを更新する（timeを代入する）
    count.textContent = time;
    //timeが０以下の場合、
    if(time <= 0){
      //clearInterval()メソッドを実行し、「id = setInterval()」をタイマー停止する
      gameOver(id);
    }
  },1000);
};


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//kadai追加
const addElem = document.createElement('p');
addElem.id = "cntType"
document.body.appendChild(addElem);
const cntType = document.getElementById('cntType');
cntType.style.color = '#888';
cntType.style.fontWeight = '700';
cntType.style.backgroundColor = '#eaeaea';
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////



//「start = document.getElementById('start')」をクリックした時に実行する
start.addEventListener('click', ()=>{
  //timer()メソッドを実行する
  timer();
  //createText()メソッドを実行する
  createText();
  //「start = document.getElementById('start')」のスタイルを変更する（非表示にする）
  start.style.display = 'none';
  //キー押下した時に「keyPress」を実行する
  document.addEventListener('keypress', keyPress);//////////////////////////////////keyPressは()は付けない？
});


//「untypedfield = document.getElementById('untyped');」のテキストを更新する
untypedfield.textContent = 'スタートボタンで開始';

