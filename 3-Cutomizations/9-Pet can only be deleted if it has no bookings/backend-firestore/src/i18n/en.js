const en = {
  app: {
    title: '',
  },

  entities: {
    pet: {
      validation: {
        bookingExists: `There is a booking for this pet, so it can't be deleted`,
      },
    },
  },

  auth: {
    passwordReset: {
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
  },

  iam: {
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own manager permission`,
    },
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  emails: {
    invitation: {
      subject: `You've been invited to {0}`,
      body: `
        <p>Hello,</p>
        <p>You've been invited to {0}.</p>
        <p>Follow this link to register.</p>
        <p><a href="{1}">{1}</a></p>
        <p>Thanks,</p>
        <p>Your {0} team</p>
      `,
    },
    emailAddressVerification: {
      subject: `Verify your email for {0}`,
      body: `
        <p>Hello,</p>
        <p>Follow this link to verify your email address.</p>
        <p><a href='{0}'>{0}</a></p>
        <p>If you didn’t ask to verify this address, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your {1} team</p>
      `,
    },
    passwordReset: {
      subject: `Reset your password for {0}`,
      body: `
        <p>Hello,</p>
        <p>Follow this link to reset your {0} password for your {1} account.</p>
        <p><a href='{2}'>{2}</a></p>
        <p>If you didn’t ask to reset your password, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your {0} team</p>
      `,
    },
  },
};

module.exports = en;
