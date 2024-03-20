import { INFT } from '@/lib/contracts/NFTContract';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  boxBalanceOf: number;
  nfts: INFT[];
}

const initialState: AccountState = {
  boxBalanceOf: 0,
  nfts: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setBoxBalanceOfAction: (
      state,
      { payload }: PayloadAction<number | undefined>,
    ) => {
      state.boxBalanceOf = payload || 0;
    },
    setNftsAction: (state, { payload }: PayloadAction<INFT[]>) => {
      state.nfts = payload;
    },
  },
  extraReducers: builder => {},
});
export default accountSlice.reducer;

export const { setBoxBalanceOfAction, setNftsAction } = accountSlice.actions;
