const en = {
  app: {
    title: 'Pet Hotel',
  },

  entities: {
    pet: {
      validation: {
        bookingExists: `O pet não pode ser deletado pois existe uma reserva para ele.`,
      },
    },
    booking: {
      validation: {
        arrivalAfterDeparture:
          'Data de saída deve ser após a data de entrada',
        periodPast: 'O período deve estar no futuro',
        periodFull:
          'Desculpe, o Pet Hotel está cheio neste período',
      },
    },
  },

  auth: {
    passwordReset: {
      error: `Email não encontrado`,
    },
    emailAddressVerificationEmail: {
      error: `Email não encontrado`,
    },
  },

  iam: {
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      disablingHimself: `Você não pode desativar-se`,
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
    },
  },

  importer: {
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  errors: {
    forbidden: {
      message: 'Acesso negado',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  emails: {
    invitation: {
      subject: `Você foi convidado para o app {0}`,
      body: `
        <p>Olá,</p>
        <p>Você foi convidado para o app {0}.</p>
        <p>Clique neste link para registrar-se.</p>
        <p><a href="{1}">{1}</a></p>
        <p>Obrigado,</p>
        <p>Equipe do app {0}</p>
      `,
    },
    emailAddressVerification: {
      subject: `Verifique seu e-mail do app {0}`,
      body: `
        <p>Olá,</p>
        <p>Clique neste link para verificar seu endereço de e-mail.</p>
        <p><a href='{0}'>{0}</a></p>
        <p>Se você não solicitou a verificação deste endereço, ignore este e-mail.</p>
        <p>Obrigado,</p>
        <p>Equipe do app {1}</p>
      `,
    },
    passwordReset: {
      subject: `Redefinir a senha do app {0}`,
      body: `
        <p>Olá,</p>
        <p>Clique neste link para redefinir a senha de login no app {0} com sua conta {1}.</p>
        <p><a href='{2}'>{2}</a></p>
        <p>Se você não solicitou a redefinição da sua senha, ignore este e-mail.</p>
        <p>Obrigado,</p>
        <p>Equipe do app {0}</p>
      `,
    },
    bookingUpdate: {
      subject: 'Temos notícias sobre {1} em {0}!',
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
                      <b>Temos notícias sobre {1}</b>
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
                      <a href="{4}">Visite {0} para saber mais</a>
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
