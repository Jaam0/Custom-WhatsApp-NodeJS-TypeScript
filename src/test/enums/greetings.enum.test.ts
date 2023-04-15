import { Greetings, GreetingsRealName } from '../../enums/greetings.enum';

describe('Greetings', () => {
  it('should have correct values', () => {
    expect(Greetings.Morning).toEqual('Buen día');
    expect(Greetings.Afternoon).toEqual('Buenas tardes');
    expect(Greetings.Night).toEqual('Buenas noches');
  });
});

describe('GreetingsRealName', () => {
  it('should have correct values', () => {
    expect(GreetingsRealName.Morning).toEqual('Morning');
    expect(GreetingsRealName.Afternoon).toEqual('Afternoon');
    expect(GreetingsRealName.Night).toEqual('Night');
  });
});
