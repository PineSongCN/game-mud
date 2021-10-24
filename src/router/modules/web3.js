import Layout from '@/layout';

const D = {
    path: '/',
    component: Layout,
    redirect: '/web3',
    sort: 100,
    children: [
        {
            path: 'web3',
            component: () => import('@/views/web3/index'),
            name: 'Web3',
            meta: { title: 'Web3', icon: '', affix: true }
        }
    ]
}

export default D;
