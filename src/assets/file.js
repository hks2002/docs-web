/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-05 19:02:47                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-17 09:50:03                               *
 * @FilePath              : docs-web/src/assets/file.js                       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

// get file name from path
const getFile = (path) => {
  const parts = path.split('/')
  return path.endsWith('/') ? parts.at(-2) : parts.at(-1)
}

// get folders from path, folders with name and path
const getFolders = (path) => {
  const parts = path.split('/')

  const result = []
  let currentPath = ''
  parts.forEach((part, index) => {
    if (part === '') return
    if (index > 0 && currentPath !== '') {
      currentPath += '/'
    }
    currentPath += part

    // skip the part /docs-api/
    if (index > 1) {
      result.push({ name: part, path: '/' + currentPath + '/' })
    }
  })
  //console.debug(result);
  return result
}

const isFolder = (path) => {
  return path.endsWith('/') ? true : getFile(path).includes('.') ? false : true
}

const getDocIcon = (fileName) => {
  if (isFolder(fileName)) {
    return 'img:imgs/folder.svg'
  }

  let index = fileName.lastIndexOf('.')
  let docType = 'UNKNOWN'
  if (index > 0) {
    docType = fileName.substring(index + 1).toUpperCase()
  }

  switch (docType) {
    case 'PDF':
      return 'img:/docs-web/imgs/pdf.svg'
    case 'BMP':
    case 'TIF':
    case 'TIFF':
    case 'JPG':
    case 'JPEG':
    case 'PNG':
    case 'SVG':
      return 'img:/docs-web/imgs/image.svg'
    case 'ZIP':
    case 'RAR':
    case '7Z':
      return 'img:/docs-web/imgs/zip.svg'
    case 'DOC':
    case 'DOCX':
      return 'img:/docs-web/imgs/word.svg'
    case 'XLS':
    case 'XLSX':
      return 'img:/docs-web/imgs/excel.svg'
    default:
      return 'img:/docs-web/imgs/file.svg'
  }
}

const renderFileSize = (sizeInBytes) => {
  if (sizeInBytes === -1) {
    return '---'
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0

  while (sizeInBytes >= 1024 && unitIndex < units.length - 1) {
    sizeInBytes /= 1024
    unitIndex++
  }

  return `${sizeInBytes.toFixed(1)} ${units[unitIndex]}`
}

export { getDocIcon, getFile, getFolders, isFolder, renderFileSize }
