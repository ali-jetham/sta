import styles from './WorkSpaceDialog.module.css'

export default function WorkSpaceDialog() {

    function openWorkspace() {
        window.electron.ipcRenderer.invoke('openWorkSpace')
    }

    return (
        <div className={styles.dialogContainer}>
            <div className={styles.dialog}>

                <div>
                    <h1>Select a Workspace</h1>
                    <p>An active workspace needs to be selected to create and manage projects</p>
                </div>

                <div>
                    <span>Open an existing workspace</span>
                    <button className={styles.button} onClick={openWorkspace}>Open</button>
                </div>

                <div>
                    <span>Create a existing workspace</span>
                    <button>Create</button>
                </div>
            </div>
        </div>
    )
};

