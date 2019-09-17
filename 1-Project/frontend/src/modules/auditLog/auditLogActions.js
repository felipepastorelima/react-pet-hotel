import AuditLogService from 'modules/auditLog/auditLogService';
import selectors from 'modules/auditLog/auditLogSelectors';
import paginationAction from 'modules/shared/pagination/paginationAction';
import exporterFields from 'modules/auditLog/auditLogExporterFields';
import { i18n } from 'i18n';

const prefix = 'AUDIT_LOG';

export default paginationAction(
  prefix,
  AuditLogService.fetch,
  selectors,
  i18n('auditLog.exporterFileName'),
  exporterFields,
);
