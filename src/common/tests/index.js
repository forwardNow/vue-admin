import orgServiceTest from '../../system/org/OrgService.test';

const test = () => {
  [
    orgServiceTest,
  ]
    .each(serviceTest => serviceTest());
};

export default test;
