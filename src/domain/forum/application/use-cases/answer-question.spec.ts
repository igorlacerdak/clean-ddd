import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository';
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it('should to be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteudo da resposta',
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id);
  });
});