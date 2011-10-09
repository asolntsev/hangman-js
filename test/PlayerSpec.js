describe("Hangman", function() {
  var words;

  beforeEach(function() {
    // startGame();
  });

  it("can choose random word from list", function() {
    chooseWord();

    expect(["дом", "флора"]).toContain(topic);
    expect(["гвоздь", "унитаз", "чайник", "гвозди", "кустст"]).toContain(word);
  });

  it("user sees underscores in places of letters in the beginning", function() {
    chooseWord();

    expect(wordInWork).toBe("______");
  });
});