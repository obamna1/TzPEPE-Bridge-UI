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
  onAmountChanged: (amount: string) => void; // Backend value
}

export const TransferFrom = (props: TransferFromProps) => {
  const [inputTokensAmount, setInputTokensAmount] = useState<string>(''); // Store the raw input
  const currentTokenDecimals = props.currentToken ? props.currentToken.decimals : 0;
  const currentTokenBalance =
    (props.currentToken && props.tokenBalances.get(props.currentToken)) || '0';

  const handleTokensAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      try {
        const rawValue = e.target.value; // Get the raw value entered by the user
        const numericValue = parseFloat(rawValue); // Parse the raw value as a number

        if (isNaN(numericValue)) {
          setInputTokensAmount(''); // Reset the input if invalid
          props.onAmountChanged(''); // Reset the parent value as well
          return;
        }

        // Check if the current token is "PEPE" and apply special logic
        const adjustedValue =
          props.currentToken?.name?.toLowerCase() === 'pepe'
            ? (numericValue * 100).toFixed(0) // Multiply by 100 for backend logic
            : tokenUtils.truncateTokensAmountToDecimals(
              rawValue,
              currentTokenDecimals
            ); // Default logic for other tokens

        console.log('Raw Value:', rawValue, 'Adjusted Value:', adjustedValue); // Debug log

        setInputTokensAmount(rawValue); // Always display the raw value to the user
        props.onAmountChanged(adjustedValue); // Send the adjusted value to the backend/parent
      } catch (err) {
        console.error('Error handling token amount change:', err); // Log errors for debugging
      }
    },
    [props.onAmountChanged, currentTokenDecimals, props.currentToken]
  );

  const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.target.value === '0') {
        setInputTokensAmount('');
        props.onAmountChanged('');
      }
    },
    [props.onAmountChanged]
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
