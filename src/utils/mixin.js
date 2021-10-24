import Web3 from 'web3';
import Web3Modal, {
    getInjectedProvider,
    getInjectedProviderName
} from 'web3modal';

let web3, web3Provider, web3Account, web3Chain, web3Modal;

export default {
    data: function () {
        return {
            web3,
            web3Provider,
            web3Account,
            web3Chain
        };
    },
    watch:  {
        web3Account:{
            handler(val){
                this.$store.commit('web3/SET_WEB3ACCOUNT', val)
            },
            deep:true
        },
        web3Chain:{
            handler(val){
                this.$store.commit('web3/SET_WEB3CHAIN', val)
            },
            deep:true
        }
    },
    created: async function () {
        web3Modal = new Web3Modal(this.$options.Web3ModalOptions);
    },
    mounted: async function () {
        // if (web3Modal.cachedProvider || this.getInjectedProvider()) {
        //     await this.connectWeb3();
        // }
    },
    methods: {
        tryConnectWeb3: async function () {
            let r = null;
            if (web3Modal.cachedProvider || this.getInjectedWeb3Provider()) {
                r = await this.connectWeb3();
            } else {
                this.$dialog.alert({
                    title: '提示',
                    message: '未检测到钱包程序'
                });
            }
            return r;
        },
        connectWeb3: async function () {
            this.web3Provider = await web3Modal.connect();

            this.web3Provider.on('connect', async (chainId) => {
                this.web3Account = (await this.web3.eth.getAccounts())[0];
                this.web3Chain = chainId;
                this.$emit('Web3Connect');
            });

            this.web3Provider.on('accountsChanged', async (accounts) => {
                this.web3Account = accounts[0];
                this.$emit('Web3AccountChange');
            });

            this.web3Provider.on('chainChanged', async (chainId) => {
                this.web3Account = (await this.web3.eth.getAccounts())[0];
                this.web3Chain = chainId;
                this.$emit('Web3ChainChange');
            });

            this.web3Provider.on('disconnect', async () => {
                this.web3Account = undefined;
                this.web3Chain = undefined;
                this.$emit('Web3Disconnect');
            });

            this.web3 = new Web3(this.web3Provider);

            this.web3Account = (await this.web3.eth.getAccounts())[0];
            this.web3Chain = await this.web3.eth.getChainId();

            this.web3.eth.subscribe('newBlockHeaders', () => {
                this.$emit('Web3NewChainBlock');
            });

            this.$emit('Web3Connect');
            return {
                web3Account:this.web3Account,
                web3Chain:this.web3Chain,
            }
        },
        connectWeb3To: async function (id) {
            this.web3Provider = await web3Modal.connectTo(id);

            this.web3Provider.on('connect', async (chainId) => {
                this.web3Account = (await this.web3.eth.getAccounts())[0];
                this.web3Chain = chainId;
                this.$emit('Web3Connect');
            });

            this.web3Provider.on('accountsChanged', async (accounts) => {
                this.web3Account = accounts[0];
                this.$emit('Web3AccountChange');
            });

            this.web3Provider.on('chainChanged', async (chainId) => {
                this.web3Account = (await this.web3.eth.getAccounts())[0];
                this.web3Chain = chainId;
                this.$emit('Web3ChainChange');
            });

            this.web3Provider.on('disconnect', async () => {
                this.web3Account = undefined;
                this.web3Chain = undefined;
                this.$emit('Web3Disconnect');
            });

            this.web3 = new Web3(this.web3Provider);

            this.web3Account = (await this.web3.eth.getAccounts())[0];
            this.web3Chain = await this.web3.eth.getChainId();

            this.web3.eth.subscribe('newBlockHeaders', () => {
                this.$emit('Web3NewChainBlock');
            });

            this.$emit('Web3Connect');
        },
        disconnectWeb3: async function () {
            if (
                this.web3Provider &&
                typeof this.web3Provider.close === 'function'
            ) {
                await this.web3Provider.close();
            }

            web3Modal.clearCachedProvider();

            this.web3.eth.clearSubscriptions();

            this.web3Account = undefined;
            this.web3Chain = undefined;
            this.web3Provider = undefined;
            this.web3 = undefined;

            this.$emit('Web3Disconnect');
        },
        cacheWeb3Provider: function () {
            web3Modal.setCachedProvider();
        },
        clearWeb3Provider: function () {
            web3Modal.clearCachedProvider();
        },
        getInjectedWeb3Provider: function () {
            return getInjectedProvider();
        },
        getInjectedWeb3ProviderName: function () {
            return getInjectedProviderName();
        }
    }
};
