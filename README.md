# To Run This:
*** BEFORE USING *** 
Still under construction. Expects updates to be made for the next week or so.
Bridge functionality for $PEPE is live, native tokens remain untested. "From" will display *100 of whatever is input. 
This is a decimal error fix I am working on, but what you put in "To" is what will be transferred. See image below: 
![image](https://github.com/user-attachments/assets/33551bac-9a1e-4938-899a-a755a7d45e79)

I encourage all users to transfer in small batches at first as this is still in testing.
  -
1. clone the repository
2. Open i in he cli of your choice
3. Install dependencies, run:
      - yarn add @baking-bad/tezos-etherlink-bridge-sdk
      - yarn add @taquito/taquito @taquito/beacon-wallet
      - yarn add web3
      - npm install ethers
4. Create ssl certificates, run
     - mkdir certificates
    - openssl req -nodes -new -x509 -keyout certificates/localhost.key -out certificates/localhost.crt -days 365 -subj "/CN=localhost"
5. You are now ready to bridge. 

