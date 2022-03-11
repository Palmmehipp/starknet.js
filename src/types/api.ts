import { BlockIdentifier } from '../provider/utils';
import { BigNumberish } from '../utils/number';
import {
  Abi,
  BlockNumber,
  CompressedCompiledContract,
  EntryPointType,
  RawCalldata,
  Signature,
  Status,
  TransactionStatus,
} from './lib';

export type Endpoints = {
  get_contract_addresses: {
    QUERY: never;
    REQUEST: never;
    RESPONSE: GetContractAddressesResponse;
  };
  add_transaction: {
    QUERY: never;
    REQUEST: Transaction;
    RESPONSE: AddTransactionResponse;
  };
  get_transaction: {
    QUERY: {
      transactionHash: string;
    };
    REQUEST: never;
    RESPONSE: GetTransactionResponse;
  };
  get_transaction_status: {
    QUERY: {
      transactionHash: string;
    };
    REQUEST: never;
    RESPONSE: GetTransactionStatusResponse;
  };
  get_storage_at: {
    QUERY: {
      contractAddress: string;
      key: number;
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: object;
  };
  get_code: {
    QUERY: {
      contractAddress: string;
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: GetCodeResponse;
  };
  get_block: {
    QUERY: {
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: GetBlockResponse;
  };
  call_contract: {
    QUERY: {
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: CallContractTransaction;
    RESPONSE: CallContractResponse;
  };
  estimate_fee: {
    QUERY: never;
    REQUEST: CallContractTransaction;
    RESPONSE: EstimateFeeResponse;
  };
};

export type GetContractAddressesResponse = {
  Starknet: string;
  GpsStatementVerifier: string;
};

export type DeployTransaction = {
  type: 'DEPLOY';
  contract_definition: CompressedCompiledContract;
  contract_address_salt: BigNumberish;
  constructor_calldata: string[];
  nonce?: BigNumberish;
};

export type InvokeFunctionTransaction = {
  type: 'INVOKE_FUNCTION';
  contract_address: string;
  signature?: Signature;
  entry_point_type?: EntryPointType;
  entry_point_selector: string;
  calldata?: RawCalldata;
  nonce?: BigNumberish;
};

export type CallContractTransaction = Omit<
  InvokeFunctionTransaction,
  'type' | 'entry_point_type' | 'nonce'
>;

export type Transaction = DeployTransaction | InvokeFunctionTransaction;

export type CallContractResponse = {
  result: string[];
};

export type GetBlockResponse = {
  block_number: number;
  state_root: string;
  block_hash: string;
  transactions: {
    [txHash: string]: Transaction;
  };
  timestamp: number;
  transaction_receipts: {
    [txHash: string]: {
      block_hash: string;
      transaction_hash: string;
      l2_to_l1_messages: {
        to_address: string;
        payload: string[];
        from_address: string;
      }[];
      block_number: BlockNumber;
      status: Status;
      transaction_index: number;
    };
  };
  previous_block_hash: string;
  status: Status;
};

export type GetCodeResponse = {
  bytecode: string[];
  abi: Abi;
};

export type GetTransactionStatusResponse = {
  tx_status: Status;
  block_hash: string;
  tx_failure_reason?: {
    tx_id: number;
    code: string;
    error_message: string;
  };
};

export type GetTransactionResponse = {
  status: Status;
  transaction: Transaction;
  block_hash: string;
  block_number: BlockNumber;
  transaction_index: number;
  transaction_hash: string;
};

export type AddTransactionResponse = {
  code: TransactionStatus;
  transaction_hash: string;
  address?: string;
};

export type TransactionReceipt = {
  status: Status;
  transaction_hash: string;
  transaction_index: number;
  block_hash: string;
  block_number: BlockNumber;
  l2_to_l1_messages: string[];
  events: string[];
};
// TODO: Add response data
export type EstimateFeeResponse = {};

export type RawArgs = {
  [inputName: string]: string | string[] | { type: 'struct'; [k: string]: BigNumberish };
};

export type Calldata = string[];
