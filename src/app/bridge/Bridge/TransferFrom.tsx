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
  const [inputTokensAmount, setInputTokensAmount] = useState<string>(''); // Store the raw input
  const currentTokenDecimals = props.currentToken ? props.currentToken.decimals : 0;
  const currentTokenBalance =
    (props.currentToken && props.tokenBalances.get(props.currentToken)) || '0';
  const onAmountChanged = props.onAmountChanged;

  // Handle input change and adjust for Pepe token decimals
  const handleTokensAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      try {
        const rawValue = e.target.value;
        const numericValue = parseFloat(rawValue);

        if (isNaN(numericValue)) {
          setInputTokensAmount('');
          onAmountChanged('');
          return;
        }

        // Special case for Pepe token: multiply by 100 for the contract
        const adjustedValue =
          props.currentToken?.name === 'Pepe'
            ? (numericValue * 100).toFixed(0) // Multiply by 100 and ensure integer format
            : tokenUtils.truncateTokensAmountToDecimals(
              rawValue,
              currentTokenDecimals
            );

        setInputTokensAmount(rawValue); // Store raw user input for display
        onAmountChanged(adjustedValue); // Send contract-ready value to parent
      } catch {
        //
      }
    },
    [onAmountChanged, currentTokenDecimals, props.currentToken]
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
      balance={currentTokenBalance} // Use raw balance directly
    >
      <>
        <input
          className="w-full py-2 pr-3 bg-transparent text-2xl focus:outline-none"
          value={inputTokensAmount} // Always show the raw input
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
