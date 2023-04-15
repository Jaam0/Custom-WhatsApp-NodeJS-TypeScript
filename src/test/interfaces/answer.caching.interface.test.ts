import { AnswerCachingInterface } from '../../interfaces/answer.caching.interface';
import { GreetingsRealName } from '../../enums/greetings.enum';

describe('AnswerCachingInterface', () => {
  let answer: AnswerCachingInterface;

  beforeEach(() => {
    answer = {
      to: 'John',
      answer: 'Hello',
      status: GreetingsRealName.Afternoon,
    };
  });

  it('should have properties to, answer, and status', () => {
    expect(answer).toHaveProperty('to');
    expect(answer).toHaveProperty('answer');
    expect(answer).toHaveProperty('status');
  });

  it('should have correct types for properties', () => {
    expect(typeof answer.to).toBe('string');
    expect(typeof answer.answer).toBe('string');
    expect(typeof answer.status).toBe('string');
  });

  it('should have correct values for properties', () => {
    expect(answer.to).toBe('John');
    expect(answer.answer).toBe('Hello');
    expect(answer.status).toBe('Afternoon');
  });
});
