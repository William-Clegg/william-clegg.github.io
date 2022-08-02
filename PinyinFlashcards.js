'use strict';

//const firstLetter = [ "", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "z", "c", "s", "zh", "ch", "sh", "r", "j", "q", "x"];

//const root = ["a", "o", "e", "i", "er", "ai", "ei", "ao", "ou", "an", "en", "ang", "eng", "ong", "ia", "iao", "ie", "iu", "ian", "in", "iang", "ing", "iong", "u", "ua", "uo", "uai", "ui", "uan", "un", "uang", "ueng", "ü", "üe", "üan", "ün"];

const priority = ["a", "o", "e", "i", "u", "ü"];

const toneMarks = ["ā","á", "ǎ", "à", "ō", "ó", "ǒ", "ò", "ē", "é", "ě", "è", "ī", "í", "ǐ", "ì", "ū", "ú", "ǔ", "ù", "ǖ", "ǘ", "ǚ", "ǜ"];

const tones = new Set([
    '\u0304', // tone 1
    '\u0301', // tone 2
    '\u030c', // tone 3
    '\u0300', // tone 4
]);

const syllables = [ "a",
	"ai",
	"an",
	"ang",
	"ao",
	"ba",
	"bai",
	"ban",
	"bang",
	"bao",
	"bei",
	"ben",
	"beng",
	"bi",
	"bian",
	"biao",
	"bie",
	"bin",
	"bing",
	"bo",
	"bu",
	"ca",
	"cai",
	"can",
	"cang",
	"cao",
	"ce",
	"cei",
	"cen",
	"ceng",
	"cha",
	"chai",
	"chan",
	"chang",
	"chao",
	"che",
	"chen",
	"cheng",
	"chi",
	"chong",
	"chou",
	"chu",
	"chua",
	"chuai",
	"chuan",
	"chuang",
	"chui",
	"chun",
	"chuo",
	"ci",
	"cong",
	"cou",
	"cu",
	"cuan",
	"cui",
	"cun",
	"cuo",
	"da",
	"dai",
	"dan",
	"dang",
	"dao",
	"de",
	"dei",
	"den",
	"deng",
	"di",
	"dian",
	"diao",
	"die",
	"ding",
	"diu",
	"dong",
	"dou",
	"du",
	"duan",
	"dui",
	"dun",
	"duo",
	"e",
	"ei",
	"en",
	"er",
	"fa",
	"fan",
	"fang",
	"fei",
	"fen",
	"feng",
	"fo",
	"fou",
	"fu",
	"ga",
	"gai",
	"gan",
	"gang",
	"gao",
	"ge",
	"gei",
	"gen",
	"geng",
	"gong",
	"gou",
	"gu",
	"gua",
	"guai",
	"guan",
	"guang",
	"gui",
	"gun",
	"guo",
	"ha",
	"hai",
	"han",
	"hang",
	"hao",
	"he",
	"hei",
	"hen",
	"heng",
	"hong",
	"hou",
	"hu",
	"hua",
	"huai",
	"huan",
	"huang",
	"hui",
	"hun",
	"huo",
	"ji",
	"jia",
	"jian",
	"jiang",
	"jiao",
	"jie",
	"jin",
	"jing",
	"jiong",
	"jiu",
	"ju",
	"juan",
	"jue",
	"jun",
	"ka",
	"kai",
	"kan",
	"kang",
	"kao",
	"ke",
	"kei",
	"ken",
	"keng",
	"kong",
	"kou",
	"ku",
	"kua",
	"kuai",
	"kuan",
	"kuang",
	"kui",
	"kun",
	"kuo",
	"lü",
	"la",
	"lai",
	"lan",
	"lang",
	"lao",
	"le",
	"lüe",
	"lei",
	"leng",
	"li",
	"lia",
	"lian",
	"liang",
	"liao",
	"lie",
	"lin",
	"ling",
	"liu",
	"long",
	"lou",
	"lu",
	"luan",
	"lun",
	"luo",
	"ma",
	"mai",
	"man",
	"mang",
	"mao",
	"me",
	"mei",
	"men",
	"meng",
	"mi",
	"mian",
	"miao",
	"mie",
	"min",
	"ming",
	"miu",
	"mo",
	"mou",
	"mu",
	"nü",
	"na",
	"nai",
	"nan",
	"nang",
	"nao",
	"ne",
	"nüe",
	"nei",
	"nen",
	"neng",
	"ni",
	"nian",
	"niang",
	"niao",
	"nie",
	"nin",
	"ning",
	"niu",
	"nong",
	"nou",
	"nu",
	"nuan",
	"nuo",
	"o",
	"ou",
	"pa",
	"pai",
	"pan",
	"pang",
	"pao",
	"pei",
	"pen",
	"peng",
	"pi",
	"pian",
	"piao",
	"pie",
	"pin",
	"ping",
	"po",
	"pou",
	"pu",
	"qi",
	"qia",
	"qian",
	"qiang",
	"qiao",
	"qie",
	"qin",
	"qing",
	"qiong",
	"qiu",
	"qu",
	"quan",
	"que",
	"qun",
	"ran",
	"rang",
	"rao",
	"re",
	"ren",
	"reng",
	"ri",
	"rong",
	"rou",
	"ru",
	"rua",
	"ruan",
	"rui",
	"run",
	"ruo",
	"sa",
	"sai",
	"san",
	"sang",
	"sao",
	"se",
	"sei",
	"sen",
	"seng",
	"sha",
	"shai",
	"shan",
	"shang",
	"shao",
	"she",
	"shei",
	"shen",
	"sheng",
	"shi",
	"shou",
	"shu",
	"shua",
	"shuai",
	"shuan",
	"shuang",
	"shui",
	"shun",
	"shuo",
	"si",
	"song",
	"sou",
	"su",
	"suan",
	"sui",
	"sun",
	"suo",
	"ta",
	"tai",
	"tan",
	"tang",
	"tao",
	"te",
	"teng",
	"ti",
	"tian",
	"tiao",
	"tie",
	"ting",
	"tong",
	"tou",
	"tu",
	"tuan",
	"tui",
	"tun",
	"tuo",
	"wa",
	"wai",
	"wan",
	"wang",
	"wei",
	"wen",
	"weng",
	"wo",
	"wu",
	"xi",
	"xia",
	"xian",
	"xiang",
	"xiao",
	"xie",
	"xin",
	"xing",
	"xiong",
	"xiu",
	"xu",
	"xuan",
	"xue",
	"xun",
	"ya",
	"yan",
	"yang",
	"yao",
	"ye",
	"yi",
	"yin",
	"ying",
	"yong",
	"you",
	"yu",
	"yuan",
	"yue",
	"yun",
	"za",
	"zai",
	"zan",
	"zang",
	"zao",
	"ze",
	"zei",
	"zen",
	"zeng",
	"zha",
	"zhai",
	"zhan",
	"zhang",
	"zhao",
	"zhe",
	"zhei",
	"zhen",
	"zheng",
	"zhi",
	"zhong",
	"zhou",
	"zhu",
	"zhua",
	"zhuai",
	"zhuan",
	"zhuang",
	"zhui",
	"zhun",
	"zhuo",
	"zi",
	"zong",
	"zou",
	"zuan",
	"zui",
	"zun",
	"zuo",
	"zu"];

let currentTone = 1;

const switcher = document.querySelector('#light-or-dark');

switcher.addEventListener('click', function() {
	document.body.classList.toggle('light-theme');
	document.body.classList.toggle('dark-theme');
	
	const className = document.body.className;
	if(className == "light-theme") {
		this.textContent = "Dark";
	} else {
		this.textContent = "Light";
	}
});

document.getElementById('textField').onkeydown = function(event) {
    if (event.keyCode == 13) {
        submitSyllable();
    }
}

function submitSyllable() {
	var str = document.getElementById("textField").value.toLowerCase();
	
	
	if(syllables.includes(str)) {
		change(str);
	} else {
		alert("Syllable not found!");
	}
}

function playPinyin() {
	
	// Get the current syllable. Then remove tones and replace ü if any with v to match Yabla's URLs. Then play the mp3 url.
	var elem = document.getElementById("current-syllable");
	var str = removeTones(elem.value);
	str = str.replace('ü', 'v');
	var audio = new Audio('https://yabla.com/chinese_static/audio/alicia/' + str + currentTone + '.mp3');
	audio.play();
}


function change(syllable) {
	
    var elem = document.getElementById("current-syllable");
	var toneChoice = document.querySelector('input[name = "toneSelection"]:checked');
	if(toneChoice.value == "All Tones") {
		currentTone = Math.floor(Math.random()*4+1);
	} else if(toneChoice.value == "First Tone")  {
		currentTone = 1; 
	} else if(toneChoice.value == "Second Tone")  {
		currentTone = 2; 
	} else if(toneChoice.value == "Third Tone")  {
		currentTone = 3; 
	} else if (toneChoice.value == "Fourth Tone") {
		currentTone = 4; 
	}
	
	var newItem = elem.value;
	var currentVal = elem.value;

	do {
		if(syllable) {
			newItem = syllable.normalize('NFC');
			currentVal = syllable.normalize('NFC');
		} else {
			newItem = syllables[Math.floor(Math.random()*syllables.length)];
		}
        if(newItem.includes('i') && newItem.includes('u')) {
            newItem = newItem.replace('u', toneMarks[16 + (currentTone-1)]);
        } else {
            for(let i = 0; i < priority.length; i++) {
                if(newItem.includes(priority[i])) {
                    newItem = newItem.replace(priority[i], toneMarks[(i*4)+(currentTone-1)]);
                    break;
                }
            }
        }
	} while(newItem == currentVal);
	
    elem.value = newItem;
}

function findTone(w) {
  const n = w.normalize('NFD');
  for (let i = 0; i < n.length; i++) {
    if (tones.has(n[i])){
      return [n[i], i - 1];
    }
  }
}

function removeTones(w) {
  w = w.normalize('NFD');  
  const [tone, letterIndex] = findTone(w);
  return w.substring(0, letterIndex + 1) + w.substring(letterIndex + 2);
}

document.getElementById('firstTone').addEventListener('click', function() {
	change(removeTones(document.getElementById('current-syllable').value));
});

document.getElementById('secondTone').addEventListener("click", function() {
	change(removeTones(document.getElementById('current-syllable').value));
});

document.getElementById('thirdTone').addEventListener("click", function() {
	change(removeTones(document.getElementById('current-syllable').value));
});

document.getElementById('fourthTone').addEventListener("click", function() {
	change(removeTones(document.getElementById('current-syllable').value));
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}