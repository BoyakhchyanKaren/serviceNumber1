const ExceptionMessages = {
  NOT_DEFINED: 'Data is not defined',
  NOT_FOUND: {
    SERVICE: 'Service not found',
    UPDATE: 'Nothing to update',
    COMMENT: 'Comment not found ',
    QUESTION: 'Question not found',
    USERS: 'Users not found',
    USER: `User not found, you provided wrong id or user doesn't exist`,
  },
  INVALID: {
    COMMENT: 'Not valid input for comment',
    QUESTION: 'Not valid input for questions',
    SERVICE: 'Not valid input for service',
    ID: "Id is not valid",
    PASSWORD:"Wrong password",
    EMAIL:"Wrong Email",
  },

  INTERNAL: 'Internal Server Error',
  DB_ERROR: 'Not valid service ID',
};
export default ExceptionMessages
