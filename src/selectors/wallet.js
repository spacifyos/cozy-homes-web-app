import { get } from "lodash";

export const getBalance = (state) => get(state, ["balance"], "");
export const getTotalExpense = (state) => get(state, ["total_expense"], "");
export const getTotalIncome = (state) => get(state, ["total_income"], "");
export const getTotalWithdrawal = (state) =>
  get(state, ["total_withdrawal"], "");
export const getUpdatedAt = (state) => get(state, ["updated_at"], "");
export const getRemarks = (state) => get(state, ["remarks"], "");
export const getType = (state) => get(state, ["type"], "");
export const getTransactionNumber = (state) => get(state, ["transaction_number"], "");
export const getAmount = (state) => get(state, ["amount"], "");
