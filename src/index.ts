import { IApi } from 'umi';
import { execSync } from 'node:child_process';

export default async function(api: IApi) {
  api.logger.info('use git plugin');
  const gitLogBuffer = execSync('git log', { maxBuffer: 100 * 1024 * 1024 }); // 100MB, use default 200KB will throw error, 10000 commit's size is around 4MB
  const gitLog = gitLogBuffer.toString();
  const latestCommitLine = gitLog.split('\n')[0];
  const latestCommitHash = latestCommitLine.split(' ')[1];
  api.logger.info('Latest commit hash: ', latestCommitHash);
  const gitStatusBuffer = execSync('git status');
  const gitStatus = gitStatusBuffer.toString();
  const onBranchLine = gitStatus.split('\n')[0];
  const onBranch = onBranchLine.split(' ')[2];
  api.logger.info('On branch: ', onBranch);
  api.modifyHTML($ => {
    $('head').prepend(
      `<meta name="Current build commit hash" content="${latestCommitHash}"></meta>`,
    );
    $('head').prepend(
      `<meta name="Current build branch" content="${onBranch}"></meta>`,
    );
    return $;
  });
}
