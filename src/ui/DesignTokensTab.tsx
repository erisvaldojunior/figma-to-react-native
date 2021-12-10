import { Button } from '@material-ui/core'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import * as _ from 'lodash'
import * as React from 'react'
import { useStore } from '../hooks/useStore'

const designTokensColumns: GridColDef[] = [
  { field: 'tokenName', headerName: 'Token Name', width: 300, editable: true },
  { field: 'tokenValue', headerName: 'Token Value', width: 300, editable: true }
]

const designTokensGroupsColumns: GridColDef[] = [
  {
    editable: true,
    field: 'groupName',
    headerName: 'Group Name',
    width: 300
  }
]

const designTokensTexts = {
  noRowsLabel: 'No Design Tokens',
  // Rows selected footer text
  footerRowSelected: (count: number) => (count !== 1 ? `${count.toLocaleString()} Design Tokens selected` : `${count.toLocaleString()} Design Token selected`)
}

const designTokensGroupsTexts = {
  noRowsLabel: 'No Groups',
  // Rows selected footer text
  footerRowSelected: (count: number) => (count !== 1 ? `${count.toLocaleString()} Groups selected` : `${count.toLocaleString()} Group selected`)
}

export const renderDesignTokensTab = () => {
  const [editDesignTokensRowsModel, setEditDesignTokensRowsModel] = React.useState<any>({})
  const [editDesignTokensGroupsRowsModel, setEditDesignTokensGroupsRowsModel] = React.useState<any>({})
  const [selectionModel, setSelectionModel] = React.useState([])
  const [groupSelectionModel, setGroupSelectionModel] = React.useState([])

  const addDesignToken = useStore((state) => state.addDesignToken)
  const addDesignTokenGroup = useStore((state) => state.addDesignTokenGroup)
  const designTokens = useStore((state) => state.designTokens)
  const designTokensCounter = useStore((state) => state.designTokensCounter)
  const designTokensGroups = useStore((state) => state.designTokensGroups)
  const designTokensGroupsCounter = useStore((state) => state.designTokensGroupsCounter)
  const deleteToken = useStore((state) => state.deleteToken)
  const deleteTokenGroup = useStore((state) => state.deleteTokenGroup)
  const updateDesignToken = useStore((state) => state.updateDesignToken)
  const updateDesignTokenGroup = useStore((state) => state.updateDesignTokenGroup)

  React.useEffect(() => {
    const objectKeys = Object.keys(editDesignTokensRowsModel)
    if (objectKeys.length !== 0) {
      const designTokenId = objectKeys[0]
      const row = editDesignTokensRowsModel[designTokenId]
      updateDesignToken(Number(designTokenId), row.tokenName?.value, row.tokenValue?.value)
    }
  }, [editDesignTokensRowsModel])

  React.useEffect(() => {
    const objectKeys = Object.keys(editDesignTokensGroupsRowsModel)
    if (objectKeys.length !== 0) {
      const groupId = objectKeys[0]
      const row = editDesignTokensGroupsRowsModel[groupId]
      updateDesignTokenGroup(Number(groupId), row.groupName?.value)
    }
  }, [editDesignTokensGroupsRowsModel])

  const onEditDesignTokensRowsModelChange = React.useCallback((model) => {
    setEditDesignTokensRowsModel(model)
  }, [])

  const onEditDesignTokensGroupsRowsModelChange = React.useCallback((model) => {
    setEditDesignTokensGroupsRowsModel(model)
  }, [])

  const onPressAddAToken = () => {
    const tokenName = 'exampleToken' + designTokensCounter
    addDesignToken(tokenName, 10)
  }

  const onPressDeleteToken = () => {
    deleteToken(selectionModel[0])
  }

  const onPressAddATokenGroup = () => {
    const groupName = 'exampleGroup' + designTokensGroupsCounter
    addDesignTokenGroup(groupName)
  }

  const onPressDeleteTokenGroup = () => {
    deleteTokenGroup(groupSelectionModel[0])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <div style={{ height: 300 }}>
          <DataGrid
            columns={designTokensColumns}
            editRowsModel={editDesignTokensRowsModel}
            localeText={designTokensTexts}
            onEditRowsModelChange={onEditDesignTokensRowsModelChange}
            onSelectionModelChange={(newSelectionModel: any) => {
              setSelectionModel(newSelectionModel)
            }}
            rows={designTokens}
            rowsPerPageOptions={[100]}
            selectionModel={selectionModel}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0px' }}>
          <Button variant="outlined" onClick={onPressAddAToken} style={{ marginRight: '20px' }}>
            ADD A TOKEN
          </Button>
          <Button disabled={_.isEmpty(selectionModel)} variant="outlined" onClick={onPressDeleteToken}>
            DELETE TOKEN
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flex: 2, height: 250 }}>
          <DataGrid
            columns={designTokensGroupsColumns}
            editRowsModel={editDesignTokensGroupsRowsModel}
            headerHeight={0}
            hideFooter
            localeText={designTokensGroupsTexts}
            onEditRowsModelChange={onEditDesignTokensGroupsRowsModelChange}
            onSelectionModelChange={(newGroupSelectionModel: any) => {
              setGroupSelectionModel(newGroupSelectionModel)
            }}
            rows={designTokensGroups}
            rowsPerPageOptions={[100]}
            selectionModel={groupSelectionModel}
          />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', margin: '20px 10px 0px 10px' }}>
          <Button variant="outlined" onClick={onPressAddATokenGroup}>
            ADD A GROUP
          </Button>
          <Button disabled={_.isEmpty(groupSelectionModel)} variant="outlined" onClick={onPressDeleteTokenGroup} style={{ marginTop: '20px' }}>
            DELETE GROUP
          </Button>
        </div>
      </div>
    </div>
  )
}
