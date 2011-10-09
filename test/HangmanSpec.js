describe("Hangman", function() {
  var words;

  beforeEach(function() {
    startGame();
  });

  describe("Game start", function() {
    it("a random word is chosen from the list", function() {
      chooseWord();

      expect(["дом", "флора"]).toContain(topic);
      expect(["гвоздь", "унитаз", "чайник", "гвозди", "кустст"]).toContain(word);
    });

    it("user sees underscores in places of letters in the beginning", function() {
      chooseWord();

      expect(wordInWork).toBe("______");
    });

    it("score is zero", function() {
      expect(failures).toBe(0);
    });
  });

  describe("Unsuccessful try", function() {
    it("when user clicks invalid letter, numbers of failures increases", function() {
      word = 'МОЛОКО';
      guessLetter('У');
      expect(failures).toBe(1);

      guessLetter('Ы');
      expect(failures).toBe(2);

      expect(wordInWork).toBe("______");
    });
  });

  describe("Successful try", function() {
    it("when user clicks valid letter, numbers of failures doesn't change", function() {
      word = 'МОЛОКО';
      guessLetter('М');
      expect(failures).toBe(0);
    });
    it("and the the guessed letter is shown", function() {
      word = 'МОЛОКО';
      guessLetter('М');
      expect(wordInWork).toBe("М_____");
    });
    it("matching is case-insensitive", function() {
      word = 'МОЛОКО';
      guessLetter('м');
      expect(wordInWork).toBe("М_____");
    });
  });
});