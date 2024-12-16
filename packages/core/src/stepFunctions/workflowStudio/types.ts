/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as vscode from 'vscode'

export type WebviewContext = {
    panel: vscode.WebviewPanel
    textDocument: vscode.TextDocument
    disposables: vscode.Disposable[]
    workSpacePath: string
    defaultTemplatePath: string
    defaultTemplateName: string
    fileStates: Record<string, FileWatchInfo>
    loaderNotification: undefined | LoaderNotification
    fileId: string
}

export type LoaderNotification = {
    progress: vscode.Progress<{
        message?: string | undefined
        increment?: number | undefined
    }>
    cancellationToken: vscode.CancellationToken
    resolve: () => void
}

export enum MessageType {
    REQUEST = 'REQUEST',
    RESPONSE = 'RESPONSE',
    BROADCAST = 'BROADCAST',
}

export enum Command {
    INIT = 'INIT',
    SAVE_FILE = 'SAVE_FILE',
    AUTO_SYNC_FILE = 'AUTO_SYNC_FILE',
    FILE_CHANGED = 'FILE_CHANGED',
    LOAD_STAGE = 'LOAD_STAGE',
    OPEN_FEEDBACK = 'OPEN_FEEDBACK',
    CLOSE_WFS = 'CLOSE_WFS',
}

export type FileWatchInfo = {
    fileContents: string
}

export interface Message {
    command: Command
    messageType: MessageType
}

export type FileChangeEventTrigger = 'INITIAL_RENDER' | 'MANUAL_SAVE'

export interface FileChangedMessage extends Message {
    fileName: string
    fileContents: string
    filePath: string
    trigger: FileChangeEventTrigger
}

export interface InitResponseMessage extends Omit<FileChangedMessage, 'trigger'> {
    isSuccess: boolean
    failureReason?: string
}

export interface SaveFileRequestMessage extends Message {
    isInvalidJson: boolean
}

export interface SyncFileRequestMessage extends SaveFileRequestMessage {
    fileContents: string
}
