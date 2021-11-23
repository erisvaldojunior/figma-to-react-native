export function getItemSpacing(node: SceneNode): number {
  if (node.type === 'FRAME' || node.type === 'INSTANCE' || node.type === 'COMPONENT') {
    if (node.layoutMode !== 'NONE') {
      if (node.primaryAxisAlignItems !== 'SPACE_BETWEEN' && node.itemSpacing > 0) {
        return node.itemSpacing
      }
    }
  }
  return 0
}

export function isImageNode(node: SceneNode): boolean {
  // 下部に Vector しか存在しないものは画像と判定する
  if ('children' in node && node.children.length > 0) {
    let hasOnlyVector = true
    node.children.forEach((child) => {
      if (child.type !== 'VECTOR') {
        hasOnlyVector = false
      }
    })
    if (hasOnlyVector) {
      return true
    }
  } else if (node.type === 'VECTOR') {
    return true
  }
  if (node.type === 'FRAME' || node.type === 'RECTANGLE') {
    if ((node.fills as Paint[]).find((paint) => paint.type === 'IMAGE') !== undefined) {
      return true
    }
  }

  return false
}
