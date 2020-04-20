<template>
	<div class="content vertical-navigation vertical-navigation-market">
		<div class="content-header">
			<i class="material-icons vertical-navigation-item" @click="$bus.$emit('add-market')">add</i>
		</div>

		<div class="content-body">

			<div class="vertical-navigation-item market-item" v-for="(i,index) in markets" :key="index"
				:class="{'active': i.symbol === $route.params.symbol}">
				<router-link :to="{name: 'market', params:{...i}}" v-html="$options.filters.marketBadge(i.symbol)" tag="span" />
				<!--Close btn-->
				<i class="material-icons market-delete" @click="deleteMarket(i.symbol)">close</i>
			</div>
		</div>

		<div class="content-footer" />

		<createMarkets />
	</div>

</template>

<script>
	import { mapState } from 'vuex'
	import gql from 'graphql-tag'

	import { markets } from "../../queries";
	import createMarkets from '../../modules/createMarketModal'

	export default {
		computed: mapState({
			markets: state => state.market.markets
		}),
		methods: {
			deleteMarket(d) {
				let markets = Array.isArray(d) ? [] : this.items.filter(i => i !== d)
				this.$apollo.mutate({
					mutation: gql`mutation markets($markets:[String]!){ markets( markets:$markets )}`,
					variables: { markets },
				}).then(() => {
					if (markets.length === 0) this.$router.push({ name: 'root' })
					this.$loader().init()
				}).catch(err => this.$notice.error(err.graphQLErrors[0].message))
			},
		},
		apollo: {
			markets,
			$subscribe: {
				markets: markets('subscription')
			}
		},
		components: {
			createMarkets,
		}
	}
</script>
