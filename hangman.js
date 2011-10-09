var topic;
var word;
var wordInWork;
var alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
var failures = 0;

function startGame() {
	chooseWord();
	wordInWork = word.replace(/./g, "_");
	failures = 0;
	showFailures(0);
	showAlphabet();
	showWordInWork();
}

function chooseWord() {
	var topicNumber = Math.floor(Math.random() * words.length);
	topic = words[topicNumber].topic;
	word = words[topicNumber].words[ Math.floor(Math.random() * words[topicNumber].words.length) ];
}

function showWordInWork() {
	$("#topic").html(topic);
	var wordContainer = $("#wordInWork");
	wordContainer.empty();

	for (i=0; i<wordInWork.length; i++) {
		$("<span>" + wordInWork.charAt(i) + "</span>").appendTo(wordContainer);
	}
}

function showFailures(failures) {
	$("#failures").text(failures);	
}

function showAlphabet() {
	var alphabetContainer = $("#alphabet");
	alphabetContainer.empty();

	alphabetContainer.append("<table><tr>");
	
	for (i=0; i<alphabet.length; i++) {
		var letterContainer = $("<td></td>");
		letterContainer.text(alphabet.charAt(i));
		letterContainer.attr("letter", alphabet.charAt(i));
		letterContainer.appendTo(alphabetContainer);
	}

	alphabetContainer.append("</tr></table>");

	$("#alphabet td").attr("onmouseover", "$(this).addClass('buttonover')");
	$("#alphabet td").attr("onmouseout", "$(this).removeClass('buttonover')");
	$("#alphabet td").click(function() {guessLetter($(this).text());});
}

function setCharAt(str,index,chr) {
	if (index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}

function guessLetter(letter) {
	var letterGuessed = false;
	for (i=0; i<word.length; i++) {
		if (word.charAt(i) == letter) {
			letterGuessed = true;
			wordInWork = setCharAt(wordInWork, i, letter);
		}
	}

	var letterContainer = $("*[letter=" + letter + "]");
	letterContainer.unbind("click");
	if (letterGuessed == true) {
		letterContainer.addClass("used");
		showWordInWork();
		if (wordInWork.indexOf("_") == -1) {
			alert("YOU WIN!");
			startGame();
		}
	}
	else {
		letterContainer.addClass("nonused");
		failures++;
		showFailures(failures);
		if (failures > 5) {
			alert("You loose... :(\nAnswer is: " + word);
			startGame();
		}
	}
}

$(function() {
	startGame();
});
