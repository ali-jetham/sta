import styles from './WorkSpaceDialog.module.css'

export default function WorkSpaceDialog({ setVisible }) {

    function openWorkSpace() {
        window.electron.ipcRenderer.invoke('openWorkSpace')
            .then(res => {
                if (res) {
                    setVisible(false)
                }
            })
    }


    return (
        <div className={styles.dialogContainer}>
            <div className={styles.dialog}>

                <div>
                    <h3>Select a Workspace</h3>
                    <p>An active workspace needs to be selected to create and manage projects</p>
                </div>

                <button className={styles.button} onClick={openWorkSpace}>Create or Open a workspace</button>
            </div>
        </div>
    )
};

