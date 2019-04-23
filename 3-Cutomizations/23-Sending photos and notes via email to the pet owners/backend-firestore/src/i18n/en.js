const en = {
  app: {
    title: 'Pet Hotel',
  },

  entities: {
    pet: {
      validation: {
        bookingExists: `There is a booking for this pet, so it can't be deleted`,
      },
    },
    booking: {
      validation: {
        arrivalAfterDeparture:
          'Departure date must be after the arrival date',
        periodPast: 'The period must be in the future',
        periodFull:
          'Sorry, the Pet Hotel is full at this time',
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
    bookingUpdate: {
      subject: 'We have news about {1} at {0}!',
      body: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding: 10px 0 30px 0;">
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
          >
            <tr>
              <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td
                      style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;"
                    >
                      <b>We have news about {1}</b>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;"
                    >
                      {2}
                    </td>
                  </tr>
                  {3}
                  <tr>
                    <td
                      style="text-align: center; padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;"
                    >
                      <a href="{4}">Visit {0} to know more</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
      twoImagesTr: `
      <tr>
      <td>
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <tr>
            {0}
            <td style="font-size: 0; line-height: 0;" width="20">
              &nbsp;
            </td>
            {1}
          </tr>
        </table>
      </td>
    </tr>
      `,
      imageTd: `<td width="260" valign="top">
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
      >
        <tr>
          <td>
            <img
              src="{0}"
              alt=""
              width="100%"
              style="display: block;"
            />
          </td>
        </tr>
      </table>
    </td>`,
    },
  },
};

module.exports = en;
