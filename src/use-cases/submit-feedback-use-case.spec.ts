import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendEmail: sendEmailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'comment',
        screenshot: 'data:image/png;base64,iVBORw0KGg:',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'comment',
        screenshot: 'data:image/png;base64,iVBORw0KGg:',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'IDEA',
        comment: '',
        screenshot: 'data:image/png;base64,iVBORw0KGg:',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'OTHER',
        comment: 'comment',
        screenshot: 'error.png',
      }),
    ).rejects.toThrow();
  });
});
