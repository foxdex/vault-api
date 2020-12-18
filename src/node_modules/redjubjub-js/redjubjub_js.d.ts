/* tslint:disable */
/* eslint-disable */
/**
* @param {string} ask_string
* @param {string} alpha_string
* @returns {string}
*/
export function generate_rk_by_ask(ask_string: string, alpha_string: string): string;
/**
* @param {string} ask_string
* @param {string} alpha_string
* @param {string} message_hash_string
* @returns {string}
*/
export function generate_spend_auth_sig(ask_string: string, alpha_string: string, message_hash_string: string): string;
/**
* @param {string} rk_string
* @param {string} message_hash_string
* @param {string} signature_string
* @returns {boolean}
*/
export function verify_spend_auth_sig(rk_string: string, message_hash_string: string, signature_string: string): boolean;
/**
* @param {string} sk_string
* @returns {string}
*/
export function generate_pk_by_sk(sk_string: string): string;
/**
* @param {string} sk_string
* @param {string} message_hash_string
* @returns {string}
*/
export function generate_binding_sig(sk_string: string, message_hash_string: string): string;
/**
* @param {string} pk_string
* @param {string} message_hash_string
* @param {string} signature_string
* @returns {boolean}
*/
export function verify_binding_sig(pk_string: string, message_hash_string: string, signature_string: string): boolean;
/**
* @returns {any}
*/
export function generate_keys(): any;
/**
* @param {string} sk_str
* @returns {any}
*/
export function generate_keys_by_sk(sk_str: string): any;
/**
* @param {string} sk_str
* @param {string} d_str
* @returns {any}
*/
export function generate_keys_by_sk_d(sk_str: string, d_str: string): any;
