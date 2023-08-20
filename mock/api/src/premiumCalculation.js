export const mockPremiumCalculation = () => {
  return {
    repProductCd: '10100001',
    productCd: '10100001',
    insPolicyBaseDate: '20230612',
    calculationCondition: {
      productProperty: {
        baseDate: '20230612',
        compensRate: 0.5,
      },
      coverProperty: [
        {
          coverCd: '201000001',
          insAmount: 600000,
        },
        {
          coverCd: '201000002',
          insAmount: 300000,
        },
        {
          coverCd: '201000003',
          insAmount: 300000,
        },
      ],
      insTargetProperty: {
        petType: '01',
        petBreed: '004',
        petBirthday: '202205',
        petWeight: 0,
      },
    },
    calculationResult: {
      firstPremiumTotal: 1450,
      premiumTotal: 1450,
      yearPremiumTotal: 17400,
      premiumSpecTotal: 17400,
    },
  };
};
