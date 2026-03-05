using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

public class FingerprintLogin : MonoBehaviour 
{
    public Image fingerprintIcon;
    public Color successColor = Color.green;

    public void OnFingerprintTouch() 
    {
        StartCoroutine(SimulateScanning());
    }

    IEnumerator SimulateScanning() 
    {
        fingerprintIcon.color = Color.cyan; 
        yield return new WaitForSeconds(1.5f);

        fingerprintIcon.color = successColor;
        Debug.Log("Access Granted");

        // Tally: Use your SceneLoader system instead of direct loading
        Object.FindFirstObjectByType<SceneLoader>().LoadCaretakerHome();
    }
}
