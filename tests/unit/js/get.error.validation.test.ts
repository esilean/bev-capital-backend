import { getErrors } from '../.././../src/e-infra/cross-cutting/utils/errors/get.error.validation'
import { ValidationError } from 'class-validator'

describe('Intra -> CrossCutting -> Utils > Error', () => {
  describe('#getErrorValidation', () => {
    it('when is ok', async (done) => {
      const errors: ValidationError[] = []
      expect(getErrors(errors)).toBe('')
      done()
    })
  })
})
