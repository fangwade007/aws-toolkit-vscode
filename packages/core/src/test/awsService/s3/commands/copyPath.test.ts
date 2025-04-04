/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'assert'
import * as sinon from 'sinon'
import * as vscode from 'vscode'
import { copyPathCommand } from '../../../../awsService/s3/commands/copyPath'
import { S3FolderNode } from '../../../../awsService/s3/explorer/s3FolderNode'
import { S3Client } from '../../../../shared/clients/s3'
import { FakeClipboard } from '../../../shared/vscode/fakeEnv'

describe('copyPathCommand', function () {
    beforeEach(function () {
        const fakeClipboard = new FakeClipboard()
        sinon.stub(vscode.env, 'clipboard').value(fakeClipboard)
    })

    it('copies path to clipboard and shows status bar confirmation', async function () {
        const node = createS3FolderNode()

        await copyPathCommand(node)

        assert.strictEqual(await vscode.env.clipboard.readText(), 'path')
    })
})

function createS3FolderNode(): S3FolderNode {
    return new S3FolderNode(
        { Name: 'name', BucketRegion: 'region', Arn: 'arn' },
        { name: 'name', path: 'path', arn: 'arn ' },
        {} as S3Client
    )
}
