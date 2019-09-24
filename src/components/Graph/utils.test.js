import { getCurrencyData } from "../Graph/utils";

describe("Graph utils", () => {
  it('s', ()=>{
    expect(getCurrencyData('','',[])).toBeTruthy();
  })
});
