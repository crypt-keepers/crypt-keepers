//TODO:
// import react components to test
// Do something to component (call functions, set state, etc)
// Run assertion tests.


describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

//These two tests are the same.

test('Addition knows that 2 and 2 make 4', () => {
  expect(2 + 2).toBe(4);
});
