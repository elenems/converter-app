import { getCurrencyData } from "../Graph/utils";

describe("Graph utils", () => {
  it('calculate currencies when they differ', ()=>{
    const data = [{'10-10-2018':[1,2,3]},{'10-09-2019':[1,2,3]}]
    expect(getCurrencyData(data,'HKD','USD')).toBeTruthy();
  })



});
