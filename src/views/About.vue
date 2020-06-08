<template>
	<section class='content addInfomation'>
		<h2 v-title>{{breadName}}</h2>
		<div class='scroll-body'>
			<div class='search'>
				<el-form ref='searchForm' :inline='true' size='mini' @submit.native.prevent>
					<c-search>
						<el-form-item label='申请编号'>
							<el-input v-model.trim='params.reqNo' :maxlength='20' clearable></el-input>
						</el-form-item>
						<el-form-item label='反担保方'>
							<el-input v-model.trim='params.customerName' :maxlength='20' clearable></el-input>
						</el-form-item>
						<!-- <el-form-item label="商业配送企业">
                        <el-input v-model.trim="params.businessObjectName" :maxlength="20" clearable></el-input>
						</el-form-item>-->
						<el-form-item label='商业配送企业'>
							<el-select v-model='params.businessObjectName' placeholder='' style='width: 100%' clearable>
								<el-option v-for='(v, i) in optionList' :key='i' :value='v.name' :label='v.name'></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type='primary' native-type='submit' @click='params.pageNum = 1 , init()'>查询</el-button>
							<el-button type='blue' class='ml20' @click='reset'>重置</el-button>
						</el-form-item>
					</c-search>
				</el-form>
			</div>
			<div class='body-content'>
				<el-table border='' :data='list' style='width: 100%' :highlight-current-row='true' size='small'>
					<el-table-column :resizable='false' type='index' label='序号' align='center' width='80'></el-table-column>
					<el-table-column :resizable='false' prop='reqNo' label='申请编号' min-width='100'></el-table-column>
					<el-table-column :resizable='false' prop='customerName' label='反担保方名称' min-width='100' show-overflow-tooltip></el-table-column>
					<el-table-column :resizable='false' prop='businessObjectName' label='商业配送企业' min-width='120' show-overflow-tooltip></el-table-column>
					<el-table-column :resizable='false' prop='payAmount' label='补缴金额' min-width='150' align='right'>
						<template slot-scope='scope'>{{ scope.row.payAmount | numFormat}}</template>
					</el-table-column>
					<el-table-column :resizable='false' prop='paymentMethod' label='担保费用支付方式' min-width='150'>
						<template slot-scope='scope'>
							<span v-if='scope.row.paymentMethod === '1''>在补缴金额中扣付</span>
							<span v-if='scope.row.paymentMethod === '2''>额外支付</span>
						</template>
					</el-table-column>
					<el-table-column v-if='$route.name !== 'review-information- :resizable='false' prop='reqState' label='状态' min-width='100'>
						<template slot-scope='scope'>
							<span :class='{p1:scope.row.reqState===10||scope.row.reqState===20||scope.row.reqState===30||scope.row.reqState===40||scope.row.reqState===50,p2:scope.row.reqState===99}'>{{reqState[scope.row.reqState]}}</span>
						</template>
					</el-table-column>
					<el-table-column v-if='$route.name !== ' :resizable='false' prop='status' label='操作' min-width='70' align='center'search-information->
						<template slot-scope='scope'>
							<span v-if='isMake && scope.row.reqState == '30''>

								<el-button size='mini' plain type='blue' make')'@click='toBlink(scope.row, '>合同制作</el-button>
							</span>
							<span v-if='isSearch'>
								<!-- <el-button size="mini" plain type="primary" v-if="scope.row.reqState === '10'" @click="toEdit(scope.row)">编辑</el-button> -->

								<el-button size='mini' plain type='blue' search')'@click='toBlink(scope.row, '>详情</el-button>
							</span>
							<span v-if='isConfirm  && scope.row.reqState == '50''>
								<el-button size='mini' plain type='blue' confirm')'@click='toBlink(scope.row, '>确认付款</el-button>


							</span>
						</template>
					</el-table-column>
				</el-table>
				<div v-if='sizeCount > params.size' class='page'>
					<el-pagination background='' layout='jumper, prev, pager, next, total' :total.sync='sizeCount' :page-size.sync='params.size' :current-page.sync='params.page' @current-change='init()'></el-pagination>

				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
    name: 'UserList',
    filters: {
    },
    components: {
    },
    data() {
        let aa = bb
        return {
            params: {
                reqNo: '',
                businessObjectName: '',
                size: 10,
                page: 1,
                isOperatingEnd: '1'
            },
            reqState: {
                10: '待提交',
                20: '待复核',
                30: '待制作合同',
                40: '待付款',
                50: '待收款',
                99: '已完成'
            },
            sizeCount: 0,
            list: [],
            optionList: []
        }
    },
    computed: {
        isMake() {
            return this.$route.name === 'fee-contact-list'
        },
        isConfirm() {
            return this.$route.name === 'fee-confirm-list'
        },
        isSearch() {
            return this.$route.name === 'fee-apply-list'
        },
        breadName() {
            if (this.isSearch) {
                return '补缴申请查询'
            } else if (this.isConfirm) {
                return '确认收款'
            } else if (this.isMake) {
                return '制作合同'
            } else {
                return '制作合同'
            }
        }
    },
    watch: {
        '$route.name'(to, from) {
            this.routerName = to
            this.reset()
        }
    },
    created() {

    },
    mounted() {
        this.getSelectData()
        this.init()
        // this.getRoleList()
    },
    methods: {
        getSelectData() {
            this.$http({
                url: 'deposit/common/getDistributionCompanyList',
                method: 'post',
                data: {}
            }).then(res => {
                if (res.code === '200') {
                    this.optionList = res.data.list
                } else {
                    console.log(res)
                }
            })
        },
        toBlink(row, type) {
            let name = ''
            switch (type) {
                case 'search':
                    name = 'fee-apply-detail'
                    break
                case 'make':
                    name = 'fee-contract-make'
                    break
                case 'confirm':
                    name = 'fee-confirm-detail'
                    break
                default:
                    name = 'fee-apply-detail'
            }
            this.$router.push({
                name,
                query: {
                    id: row.id
                }
            })
        },
        reset() {
            this.params = {
                reqNo: '',
                businessObjectName: '',
                customerName: '',
                isOperatingEnd: '1',
                page: 1,
                size: 10
            }
            this.init()
        },
        search() {
            const vm = this
            vm.$router.replace({
                path: '/user',
                query: vm.params
            })
            vm.$refs.userList.search()
        },
        init() {
            if (this.isMake) {
                this.params.reqState = '30'
            }
            if (this.isConfirm) {
                this.params.reqState = '50'
            }
            if (this.isSearch) {
                this.params.reqState = ''
            }
            this.$http({
                url: 'deposit/payDeposit/payBackPageList',
                method: 'post',
                data: this.params
            }).then(res => {
                this.list = res.data.list
                this.sizeCount = res.data.sizeCount
            })
        }

    },
}
</script>

<style lang="scss" scoped>
	.p1 {
		color: #0486fe;
	}

	.p2 {
		color: #3dbd7d;
	}
</style>
