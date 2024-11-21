import { memo, useCallback, useState } from 'react';

import { TokensListPure } from './TokensList';
import { TransferPure } from './Transfer';
import type { Token } from '@/models';
import { tokenUtils } from '@/utils';

interface TransferFromProps {
  isTezos: boolean;
  currentToken: Token | null;
  blockchainTokens: readonly Token[];
  tokenBalances: ReadonlyMap<Token, string>;

  onTokenSelected: (token: Token | null) => void;
  onAmountChanged: (amount: string) => void;
}

export const TransferFrom = (props: TransferFromProps) => {
  const [inputTokensAmount, setInputTokensAmount] = useState<string>('');
  const currentTokenDecimals = props.currentToken ? props.currentToken.decimals : 0;
  const currentTokenBalance =
    (props.currentToken && props.tokenBalances.get(props.currentToken)) || '0';
  const onAmountChanged = props.onAmountChanged;

  // Handle input change directly without unnecessary adjustments
  const handleTokensAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      try {
        const rawValue = e.target.value;
        // Ensure the value respects the token's decimals
        const preparedValue = tokenUtils.truncateTokensAmountToDecimals(
          rawValue,
          currentTokenDecimals
        );

        setInputTokensAmount(preparedValue); // Update input for display
        onAmountChanged(preparedValue); // Send raw value to parent
      } catch {
        //
      }
    },
    [onAmountChanged, currentTokenDecimals]
  );

  const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    e => {
      if (e.target.value === '0') {
        setInputTokensAmount('');
        onAmountChanged('');
      }
    },
    [onAmountChanged]
  );

  return (
    <TransferPure
      title="Transfer From"
      isTezos={props.isTezos}
      balance={currentTokenBalance} // Use the raw balance directly
    >
      <>
        <input
          className="w-full py-2 pr-3 bg-transparent text-2xl focus:outline-none"
          value={inputTokensAmount}
          step={10 ** -currentTokenDecimals}
          type="number"
          placeholder="0.00"
          onChange={handleTokensAmountChange}
          onBlur={handleInputBlur}
        />
        <div className="flex-none text-right">
          <TokensListPure
            tokens={props.blockchainTokens}
            currentToken={props.currentToken}
            tokenBalances={props.tokenBalances}
            onTokenSelected={props.onTokenSelected}
          />
        </div>
      </>
    </TransferPure>
  );
};

export const TransferFromPure = memo(TransferFrom);
