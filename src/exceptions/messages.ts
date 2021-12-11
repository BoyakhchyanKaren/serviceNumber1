const ExceptionMessages = {
  NOT_DEFINED: 'Data is not defined',
  NOT_FOUND: {
    SERVICE: 'Service not found',
    UPDATE: 'Nothing to update',
    COMMENT: 'Comment not found ',
    QUESTION: 'Question not found',
  },
  INVALID: {
    COMMENT: 'Not valid input for comment',
    QUESTION: 'Not valid input for questions',
    SERVICE: 'Not valid input for service',
    ID: 'Id is not valid',
  },

  INTERNAL: 'Internal Server Error',
  DB_ERROR: 'Not valid service ID',
};
export default ExceptionMessages;
