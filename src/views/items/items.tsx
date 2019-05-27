import React, { Component, ReactNode } from 'react'
import { IDefaultResult } from '../../types'
import { ChildProps, graphql } from 'react-apollo'
import { getItemsQuery } from '../../graphql/queries/getItems'
import { ItemsQuery } from '../../graphql/queries/__generated__/ItemsQuery'
import ItemGrid from '../../components/itemGrid'
import { ItemsContainer, ItemSide, ItemsSide } from './style'
import { ItemFilter } from '../../../__generated__/globalTypes'
import { Item } from './index'

interface IProps {
  address?: string
}

interface IData extends ItemsQuery, IDefaultResult {
}

interface IVariables {
  filter?: ItemFilter
  // offset: number
  // limit: number
}

type TChildProps = ChildProps<IProps, IData, IVariables>

class Items extends Component<TChildProps> {
  state = {
    selectedAssetId: null,
  }

  componentDidUpdate(prevProps: Readonly<TChildProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.address !== prevProps.address) {
      this.selectAssetId(null)
    }
  }

  selectAssetId = (assetId: string | null): void => {
    this.setState({
      selectedAssetId: assetId,
    })
  }

  render(): ReactNode {
    const data = this.props.data as IData
    const { loading, error } = data
    const assetId = this.state.selectedAssetId

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <ItemsContainer>
        <ItemsSide constrain={!!assetId}>
          <ItemGrid items={data.items || []} selectItem={this.selectAssetId}/>
        </ItemsSide>
        <ItemSide isActive={!!assetId}>
          {assetId && <Item assetId={assetId}/>}
        </ItemSide>
      </ItemsContainer>
    )
  }
}

const withItems = graphql<IProps, IData, IVariables>(getItemsQuery, {
  options: props => ({
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        gameAddress: props.address,
      },
    },
  }),
})

export default withItems(Items)