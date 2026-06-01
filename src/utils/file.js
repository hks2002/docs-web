/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-04-05 19:02:47                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-05-28 12:35:55                                *
 * @FilePath              : docs-web/src/utils/file.js                         *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/

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
  if (!path) return false
  return path.endsWith('/') ? true : getFile(path).includes('.') ? false : true
}

const getDocIcon = (fileName) => {
  if (!fileName) return ''
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
      return 'img:imgs/pdf.svg'
    case 'BMP':
    case 'TIF':
    case 'TIFF':
    case 'JPG':
    case 'JPEG':
    case 'PNG':
    case 'SVG':
      return 'img:imgs/image.svg'
    case '3DM':
    case '3DS':
    case '3MF':
    case 'OMF':
    case 'BL':
    case 'BREP':
    case 'DAE':
    case 'FBX':
    case 'FCSTD':
    case 'GLTF':
    case 'IFC':
    case 'IGES':
    case 'STEP':
    case 'STP':
    case 'STL':
    case 'OBJ':
    case 'OFF':
    case 'PLY':
    case 'WRL':
      return 'img:imgs/3d.svg'
    case 'ZIP':
    case 'RAR':
    case '7Z':
      return 'img:imgs/zip.svg'
    case 'DOC':
    case 'DOCX':
      return 'img:imgs/word.svg'
    case 'XLS':
    case 'XLSX':
      return 'img:imgs/excel.svg'
    default:
      return 'img:imgs/file.svg'
  }
}

const renderFileSize = (sizeInBytes) => {
  if (sizeInBytes === -1 || sizeInBytes === 0) {
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
const supported3DFormats = [
  '3DM',
  '3DS',
  '3MF',
  'OMF',
  'BL',
  'BREP',
  'DAE',
  'FBX',
  'FCSTD',
  'GLTF',
  'IFC',
  'IGES',
  'STEP',
  'STP',
  'STL',
  'OBJ',
  'OFF',
  'PLY',
  'WRL',
]
const isSupported3DFormat = (fileName) => {
  let index = fileName.lastIndexOf('.')
  let docType = 'UNKNOWN'
  if (index > 0) {
    docType = fileName.substring(index + 1).toUpperCase()
  }
  console.debug(docType, supported3DFormats.includes(docType))

  return supported3DFormats.includes(docType)
}

export {
  getDocIcon,
  getFile,
  getFolders,
  isFolder,
  isSupported3DFormat,
  renderFileSize,
  supported3DFormats,
}
